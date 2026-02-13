use std::fs;
use tauri::menu::{MenuBuilder, SubmenuBuilder};

#[tauri::command]
fn read_file(path: &str) -> String {
  let data = fs::read_to_string(path).expect("Unable to read file");
  data.into()
}

#[tauri::command]
fn log(message: &str) {
  println!("{}", message)
}

pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_dialog::init())
    .setup(|app| {
      let app_name = &app.package_info().name;

      let mac_submenu = SubmenuBuilder::new(app, app_name)
        .about(None)
        .separator()
        .services()
        .separator()
        .hide()
        .hide_others()
        .show_all()
        .separator()
        .quit()
        .build()?;

      let edit_submenu = SubmenuBuilder::new(app, "Edit")
        .undo()
        .redo()
        .separator()
        .cut()
        .copy()
        .paste()
        .select_all()
        .build()?;

      let menu = MenuBuilder::new(app)
        .item(&mac_submenu)
        .item(&edit_submenu)
        .build()?;

      app.set_menu(menu)?;

      Ok(())
    })
    .invoke_handler(tauri::generate_handler![read_file, log])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
