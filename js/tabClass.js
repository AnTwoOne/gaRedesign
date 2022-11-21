//We want to create a class for building tabs

export default class gaTabs {
  constructor(selector, options = {}, addOns = {}) {
    this.selector = selector;
    this.options = options;
    this.addOns = addOns;
  }

  init() {
    const tab = document.querySelector(`${this.selector}`);
    if (tab !== undefined && tab !== null) {
      const tabContents = tab.querySelectorAll(".tab-content");
      const tabOpeners = tab.querySelectorAll(".tab-opener");
      let tabToggles = null;
      //Adding the height to the tabs element
      if (this.options.height) {
        tab.style.height = `${this.options.height}`;
      }

      if (this.options.tabToggle === true) {
        tabToggles = tab.querySelectorAll(".tab-opener__toggle");
      }
      const tabsBehavior = (tab) => {
        const openTab = (tabOpener) => {
		// Get the targeted tab content
          const tabContent = tab.querySelector(
            `.tab-content[data-openedBy="${tabOpener.dataset.opens}"]`
          );
		  // Get the other tab contents
          const otherTabContents = tab.querySelectorAll(
            `.tab-content:not([data-openedBy="${tabOpener.dataset.opens}"])`
          );
		  // Get the other tab openers
          const otherTabOpeners = tab.querySelectorAll(
            `.tab-opener:not([data-opens="${tabOpener.dataset.opens}"])`
          );
		  // If the tab has toggle option
            if (this.options.tabToggle === true) {
              const tabToggle = tab.querySelector(
                `.tab-opener__toggle[data-opens="${tabOpener.dataset.opens}"]`
              );
              const otherTabToggles = tab.querySelectorAll(
                `.tab-opener__toggle:not([data-opens="${tabOpener.dataset.opens}"])`
              );
              otherTabToggles.forEach((otherTabToggle) => {
                otherTabToggle.classList.remove("js-tab-toggle-active");
              });
              tabToggle.classList.add("js-tab-toggle-active");
            }
          // If the tab has an option of animation
          if (this.options.animation.status == true) {
			console.log(this.options.animation.status, 'animation status');
			//Get the current active tab
			const currentActiveTab = tab.querySelector(".js-tab-content-active");
			//If the current active tab is not the same as the tab that is being opened
			if (currentActiveTab !== tabContent) {
				console.log(currentActiveTab, 'tab to exit');
				console.log(tabContent, 'tab to enter');
				//Play the exit animation on the current active tab
				this.options.animation.function(currentActiveTab, 'exit', this.options.animation.duration);
				//Play the enter animation on the tab that is being opened
				setTimeout(() => {
					this.options.animation.function(tabContent, 'enter', this.options.animation.duration);
				}, this.options.animation.duration - this.options.animation.duration * 0.4);
				

				otherTabOpeners.forEach((tabOpener) =>
              		tabOpener.classList.remove("js-tab-opener-active")
            	);
				tabOpener.classList.add("js-tab-opener-active");
			}
			//If the current active tab is the same as the tab that is being opened
			// Do nothing
			}
		// If the tab does not have an option of animation
		else if (this.options.animation.status == false) {
			// Remove the active class from the other tab openers
			otherTabOpeners.forEach((tabOpener) =>
			  tabOpener.classList.remove("js-tab-opener-active")
			);
			// Add the active class to the tab opener
			tabOpener.classList.add("js-tab-opener-active");
			// Remove the active class from the other tab contents
			otherTabContents.forEach((tabContent) =>
			  tabContent.classList.remove("js-tab-content-active")
			);
			// Add the active class to the tab content
			tabContent.classList.add("js-tab-content-active");
		  }
		
        };
		// End of openTab function
		// Add event listener to the tab openers and call the openTab function on click
        tabOpeners.forEach((tabOpener) => {
          tabOpener.addEventListener("click", () => openTab(tabOpener));
        });
	  };
	  //End of tabsBehavior function
	  //If the tab has any addOns then call the addOns functions
	  if (this.addOns !== null && this.addOns !== undefined) {
		// console.log(this.addOns);
		Object.keys(this.addOns).forEach((addOn) => {
			console.log('running an addOn');
			this.addOns[addOn](tab);
		});
		}
	tabsBehavior(tab);
	}
}
// End of the init function
}




