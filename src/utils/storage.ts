export const getStoredData = async <Type>(key: string) => {
  return new Promise<Type>((resolve, reject) => {
    try {
      chrome.storage.sync.get(key, (value) => {
        resolve(value[key]);
      });
    } catch (ex) {
      console.error(ex);
      reject(ex);
    }
  });
};

export const setStoredData = async (key: string, value: any) => {
  try {
    await chrome.storage.sync.set({ [key]: value });
  } catch (err) {
    console.error(err);
  }
};
