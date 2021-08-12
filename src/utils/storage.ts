export const getStoredData = async (key: string) => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(key, (value: any) => {
        resolve(value[key]);
      });
    } catch (ex) {
      console.error(ex);
      reject(ex);
    }
  });
};

export const setStoredData = async (key: string, value: any) => {
  let storeObj: any = {};
  storeObj[key] = value;
  try {
    await chrome.storage.sync.set(storeObj);
  } catch (err) {
    console.error(err);
  }
};
