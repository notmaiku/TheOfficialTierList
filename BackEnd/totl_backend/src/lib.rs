mod database;
mod routes;

use sea_orm::Database;
use sea_orm::ConnectOptions;
use tokio::time::Duration;
use std::net::SocketAddr;
use crate::routes::create_routes;

pub async fn run(database_uri: &str){
    let database = Database::connect(database_uri).await.unwrap();
    let app = routes::create_routes(database);
    let addr = SocketAddr::from(([0,0,0,0], 3000));
    println!("listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await;
}
