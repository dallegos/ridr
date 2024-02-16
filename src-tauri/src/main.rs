// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn title(name: &str) -> String {
    format!("Rick & {}", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![title])
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
