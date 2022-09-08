#[macro_use] 
extern crate rocket;
extern crate reqwest;

mod data;

use rocket::{routes, Rocket, Build};
use rocket::serde::json::Json;
use data::Visit;
use data::Ad;
use std::{thread};

#[post("/newVisit", format = "json", data = "<req>")]
fn add_visit(req: Json<Visit>) -> Json<String> {
    thread::spawn(move || {
        let resp = data::add_visit(req.into_inner());
        Json(resp.unwrap())
    }).join().unwrap()
}

#[get("/worstUsers")]
async fn worst_users() -> Json<Vec<(String, i32)>>{
   
    let nr_reported_comments = data::get_worst_behaved_users();
    Json(nr_reported_comments.await.unwrap())
    
}

#[get("/mostSubscribed")]
async fn most_subscribed_ads() -> Json<Vec<(Ad, i32)>> {
   
    let ads_with_nr_subs = data::get_most_subscribed_ads();
    Json(ads_with_nr_subs.await.unwrap())
 
}

#[get("/popularManufacturers")]
async fn popular_manufacturers() -> Json<Vec<(String, usize)>> {
   
    let popular_manufactuers = data::get_popular_manufacturers();
    Json(popular_manufactuers.await.unwrap())
 
}

#[get("/visits")]
fn get_all_visits() -> Json<Vec<(i32, usize)>> {
    thread::spawn(move || {
        let visits = data::get_all_visits();
        Json(visits.unwrap())
    }).join().unwrap()
}

#[launch]
fn rocket() -> Rocket<Build> {
    thread::spawn(|| {
        match data::init_data() {
            Ok(()) => println!("DB is initialized successfuly"),
            Err(error) => println!("Error: {:?}", error),
        }
    }).join().expect("Thread panicked");

    rocket::build()
        .mount("/api/reports", 
            routes![
                worst_users, most_subscribed_ads, popular_manufacturers, add_visit, get_all_visits
            ])
}