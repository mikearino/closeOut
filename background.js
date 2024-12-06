chrome.commands.onCommand.addListener((command, tab) => {
    if (command === "close-inactive-tabs") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          function closeBackgroundTabs() {
            const closeButtons = document.querySelectorAll(
              'div[role="tab"][data-selected="false"] button[aria-label="Close"]'
            );
  
            if (closeButtons.length > 0) {
              closeButtons.forEach((btn) => btn.click());
              // Run the function again after a short delay to catch any remaining tabs
              setTimeout(closeBackgroundTabs, 100);
            }
          }
  
          closeBackgroundTabs();
        },
      });
    }
  });
  