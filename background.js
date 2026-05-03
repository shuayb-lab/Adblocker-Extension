let protectedTabId = null;
let enabled = false;

chrome.storage.local.get("enabled", (data) => {
  enabled = data.enabled ?? false;
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) {
    enabled = changes.enabled.newValue;
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  protectedTabId = activeInfo.tabId;
});

chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabId === protectedTabId) {
    protectedTabId = null;
  }
});

chrome.tabs.onCreated.addListener((tab) => {
  if (!enabled) return;

  if (protectedTabId !== null && tab.id !== protectedTabId) {
    chrome.tabs.remove(tab.id, () => {
      if (chrome.runtime.lastError) return;

      chrome.tabs.update(protectedTabId, { active: true });
    });
  }
});