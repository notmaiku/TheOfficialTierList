mod hello_world;
mod create_tier;
mod get_tiers;
mod delete_tier;
mod update_tier;

use sea_orm::{DatabaseConnection};
use axum::{
    response::Html,
    routing::{get, post, put, delete},
    Router, Extension, 
};
use hello_world::hello_world;
use create_tier::{create_tier, create_multiple_tiers};
use get_tiers::get_one_tier;
use get_tiers::get_all_tiers;
use delete_tier::delete_tier;
use update_tier::atomic_update;

pub fn create_routes(database: DatabaseConnection) -> Router{
    Router::new().route("/", get(hello_world))
        .route("/tiers", post(create_tier))
        .route("/tiers/create", post(create_multiple_tiers))
        .route("/:game/tiers", get(get_all_tiers))
        .route("/tiers/:tier_id", get(get_one_tier))
        .route("/tiers/:tier_id", put(atomic_update))
        .route("/tiers/:tier_id", delete(delete_tier))
        .layer(Extension(database))
}