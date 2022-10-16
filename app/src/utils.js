export function getFileBase64DataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function getCurrentLatitudeLongitude() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      reject
    );
  });
}

export const DEFAULT_LOCATION = {
  lat: 59.93894559696041,
  lng: 30.31501943038184,
};

export const GOOGLE_MAPS_API_KEY = "AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8";
