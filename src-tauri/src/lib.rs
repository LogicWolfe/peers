use std::fs;
use tauri::menu::{MenuBuilder, SubmenuBuilder};

#[tauri::command]
fn read_file(path: &str) -> Result<String, String> {
  fs::read_to_string(path).map_err(|e| format!("{path}: {e}"))
}

#[tauri::command]
fn log(message: &str) {
  println!("{}", message)
}

pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_dialog::init())
    .setup(|app| {
      let handle = app.handle();

      let edit_submenu = SubmenuBuilder::new(handle, "Edit")
        .undo()
        .redo()
        .separator()
        .cut()
        .copy()
        .paste()
        .select_all()
        .build()?;

      let mut menu_builder = MenuBuilder::new(handle);

      #[cfg(target_os = "macos")]
      {
        let app_name = &app.package_info().name;
        let app_submenu = SubmenuBuilder::new(handle, app_name)
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
        menu_builder = menu_builder.item(&app_submenu);
      }

      let menu = menu_builder.item(&edit_submenu).build()?;
      app.set_menu(menu)?;

      Ok(())
    })
    .invoke_handler(tauri::generate_handler![read_file, log])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
