use postgres::{Client, Error, NoTls};
use chrono::{prelude::*};
use serde::{Serialize, Deserialize};
use std::{collections::{BTreeMap}};

#[derive(Debug, Serialize, Deserialize)]
pub struct Visit {
    id: i32,
    ad_id: i32,
    timestamp: String,
    username: String,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Ad {
    ID: i32,
    Manufacturer: String,
    ModelName: String,
    Mileage: i32,
    AskingPrice: f32,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct MailingListEntry{
    AdId: i32,
	Mail: String,
}

// init db
pub fn init_data() -> Result<(), Error> {
    let mut client = Client::connect(
        "postgresql://postgres:root@localhost:5432/atob_reports",
        NoTls,
    )?;

    client.batch_execute("DROP TABLE IF EXISTS public.visits")?;

    client.batch_execute(
        "
        CREATE TABLE IF NOT EXISTS public.visits (
            id                  SERIAL PRIMARY KEY,
            ad_id               INTEGER NOT NULL,
            timestamp           VARCHAR NOT NULL,
            username            VARCHAR NOT NULL
            )
    ",
    )?;

    client.execute(
        "INSERT INTO public.visits (ad_id, timestamp, username) VALUES ($1, $2, $3)",
        &[
            &3.to_owned(), 
            &str::replace(&Utc.ymd(2022, 9, 3).to_string(), "UTC", ""), 
            &"UserJohn", 
        ],
    )?;

    client.execute(
        "INSERT INTO public.visits (ad_id, timestamp, username) VALUES ($1, $2, $3)",
        &[
            &5.to_owned(), 
            &str::replace(&Utc.ymd(2022, 9, 3).to_string(), "UTC", ""), 
            &"UserJohn", 
        ],
    )?;

    client.execute(
        "INSERT INTO public.visits (ad_id, timestamp, username) VALUES ($1, $2, $3)",
        &[
            &5.to_owned(), 
            &str::replace(&Utc.ymd(2022, 9, 3).to_string(), "UTC", ""), 
            &"UserJane", 
        ],
    )?;

    client.execute(
        "INSERT INTO public.visits (ad_id, timestamp, username) VALUES ($1, $2, $3)",
        &[
            &2.to_owned(), 
            &str::replace(&Utc.ymd(2022, 9, 3).to_string(), "UTC", ""), 
            &"UserJane", 
        ],
    )?;

    client.execute(
        "INSERT INTO public.visits (ad_id, timestamp, username) VALUES ($1, $2, $3)",
        &[
            &2.to_owned(), 
            &str::replace(&Utc.ymd(2022, 9, 3).to_string(), "UTC", ""), 
            &"UserZack", 
        ],
    )?;

    client.execute(
        "INSERT INTO public.visits (ad_id, timestamp, username) VALUES ($1, $2, $3)",
        &[
            &2.to_owned(), 
            &str::replace(&Utc.ymd(2022, 9, 3).to_string(), "UTC", ""), 
            &"UserZack", 
        ],
    )?;

    client.close()?;

    Ok(())
}

pub fn add_visit(visit: Visit) -> Result<String, Error> {
    let mut client = Client::connect(
        "postgresql://postgres:root@localhost:5432/atob_reports",
        NoTls,
    )?;
    
    client.execute(
        "INSERT INTO public.visits (ad_id, timestamp, username) VALUES ($1, $2, $3)",
        &[
            &visit.ad_id.to_owned(), 
            &visit.timestamp.to_string(),
            &visit.username.to_string(),
        ],
    )?;

    client.close()?;

    Ok("Visit has been noted.".to_string())
}


pub async fn get_worst_behaved_users() -> Result<Vec<(String, i32)>, Error> {
    let url_string: String = format!("http://localhost:8081/api/comments/nrReports");

    let resp: BTreeMap<String, i32> = reqwest::get(url_string)
    .await
    .unwrap()
    .json()
    .await.unwrap();

    let mut v = Vec::from_iter(resp);
    v.sort_by(|&(_, a), &(_, b)| b.cmp(&a));

    Ok(v)
}

pub async fn get_most_subscribed_ads() -> Result<Vec<(Ad, i32)>, Error> {
    let url_string: String = format!("http://localhost:8081/api/ads/allAds");

    let ads: Vec<Ad> = reqwest::get(url_string)
    .await
    .unwrap()
    .json()
    .await.unwrap();

    let mut ads_with_nr_subs: Vec<(Ad, i32)> = Vec::new();
    
    for ad in ads{
        let url_string: String = format!("http://localhost:8081/api/ads/subscribers/{:?}", ad.ID);

        let subscribers: Vec<MailingListEntry> = reqwest::get(url_string)
        .await
        .unwrap()
        .json()
        .await.unwrap();

        if subscribers.len() > 0 {
            ads_with_nr_subs.push((ad, subscribers.len().try_into().unwrap()))
        }
    }

    ads_with_nr_subs.sort_by(|&(_, a), &(_, b)| b.cmp(&a));

    Ok(ads_with_nr_subs)
}

pub async fn get_popular_manufacturers() -> Result<Vec<(String, usize)>, Error>{
    let url_string: String = format!("http://localhost:8081/api/ads/allAds");

    let mut frequencies: BTreeMap<String, usize> = BTreeMap::new();
    

    let ads: Vec<Ad> = reqwest::get(url_string)
    .await
    .unwrap()
    .json()
    .await.unwrap();

    for ad in ads {
        *frequencies.entry(ad.Manufacturer).or_default() += 1;
    }

    let mut v = Vec::from_iter(frequencies);
    v.sort_by(|&(_, a), &(_, b)| b.cmp(&a));

    Ok(v)
}

pub fn get_all_visits() -> Result<Vec<(i32, usize)>, Error> {
    let mut client = Client::connect(
        "postgresql://postgres:root@localhost:5432/atob_reports",
        NoTls,
    )?;

    let mut ret: Vec<Visit> = vec![];
    for row in client.query("SELECT id, ad_id, timestamp, username FROM public.visits", &[])? {
        let id: i32 = row.get(0);
        let ad_id: i32 = row.get(1);
        let timestamp: &str = row.get(2);
        let username: &str = row.get(3);
        
        ret.push(Visit { 
            id: (id),
            ad_id: (ad_id),
            timestamp: (timestamp.to_string()),
            username: (username.to_string())});
        
    }
    client.close()?;

    let mut frequencies: BTreeMap<i32, usize> = BTreeMap::new();

    for visit in ret {
        *frequencies.entry(visit.ad_id).or_default() += 1;
    }

    let mut v = Vec::from_iter(frequencies);
    v.sort_by(|&(_, a), &(_, b)| b.cmp(&a));

    Ok(v)
}