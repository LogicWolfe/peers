use std::fs;

fn main() {
  tauri::Builder::default()
  .invoke_handler(tauri::generate_handler![read_file, log])
  .run(tauri::generate_context!())
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