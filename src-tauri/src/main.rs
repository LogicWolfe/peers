use std::fs;
use tauri::{
  CustomMenuItem, Manager, Menu, MenuEntry, MenuItem, Submenu, WindowBuilder, WindowUrl,
};
fn main() {
  let ctx = tauri::generate_context!();
  let mac = MenuEntry::Submenu(Submenu::new(
    &ctx.package_info().name,
    Menu::with_items([
      MenuItem::About(ctx.package_info().name.clone()).into(),
      MenuItem::Separator.into(),
      MenuItem::Services.into(),
      MenuItem::Separator.into(),
      MenuItem::Hide.into(),
      MenuItem::HideOthers.into(),
      MenuItem::ShowAll.into(),
      MenuItem::Separator.into(),
      MenuItem::Quit.into(),
    ]),
  ));
  let edit = MenuEntry::Submenu(Submenu::new(
    "Edit",
    Menu::with_items([
      MenuItem::Undo.into(),
      MenuItem::Redo.into(),
      MenuItem::Separator.into(),
      MenuItem::Cut.into(),
      MenuItem::Copy.into(),
      MenuItem::Paste.into(),
      #[cfg(not(target_os = "macos"))]
      MenuItem::Separator.into(),
      MenuItem::SelectAll.into(),
    ]),
  ));
  

  tauri::Builder::default()
  .menu(Menu::with_items([
    #[cfg(target_os = "macos")]
    mac,
    edit
  ]))
  .invoke_handler(tauri::generate_handler![read_file, log])
  .run(ctx)
  .expect("error while running tauri application");
}

#[tauri::command]
fn read_file(path: &str) -> String {
  let data = fs::read_to_string(path).expect("Unable to read file");
  data.into()
}

#[tauri::command]
fn log(message: &str) {
  println!("{}", message)
}