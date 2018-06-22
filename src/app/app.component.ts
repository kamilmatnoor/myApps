import { Component, ViewChild  } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { IntroPage } from '../pages/intro/intro';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ProjectPage } from '../pages/project/project';
import { ContactPage } from '../pages/contact/contact';

import { PageOptions } from '../interfaces/page-options';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') myNav: NavController;
  rootPage: any = IntroPage;
  // pages: Array<{ title: string, component: any }>;
  pages: PageOptions[] = [{
    title: 'Home',
    name: 'TabsPage',
    component: HomePage,
    tabComponent: HomePage,
    index: 0,
    icon: 'home'
  }, {
    title: 'About Me',
    name: 'TabsPage',
    component: AboutPage,
    tabComponent: AboutPage,
    index: 1,
    icon: 'contact'
  }, {
    title: 'My Projects',
    name: 'TabsPage',
    component: ProjectPage,
    tabComponent: ProjectPage,
    index: 2,
    icon: 'laptop'
  }, {
    title: 'Contact',
    name: 'TabsPage',
    component: ContactPage,
    tabComponent: ContactPage,
    index: 3,
    icon: 'call'
  }];

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public storage: Storage, public menu: MenuController) {

    // Check if the user has already seen the tutorial
    this.storage.get('hasSeenIntro')
      .then((hasSeenIntro) => {
        if (hasSeenIntro) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = IntroPage;
        }
        this.platformReady()

      });
  }
  platformReady() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  openPage(page: PageOptions) {
    let params = {};

    if (page.index) {
      params = { tabIndex: page.index };
    }

    if (this.myNav.getActiveChildNavs().length && page.index != undefined) {
      this.myNav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Set the root of the nav with params if it's a tab index
      this.myNav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

  }

  isMenuActivated(page: PageOptions){
    let childNav = this.myNav.getActiveChildNavs()[0];
    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.myNav.getActive() && this.myNav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }
}
