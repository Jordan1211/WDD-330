import HikesModel from './HikesModel.js';
import HikesView from './HikesView.js';

// Hike controller
export default class HikesController {
  constructor(parentId) {
    this.parentElement = document.getElementById(parentId);
    // this is how our controller will know about the model and view...we add them right into the class as members.
    this.hikesModel = new HikesModel();
    this.hikesView = new HikesView(parentId);
  }

  showHikeList() {
    //  this will get called each time we need to display our full hike list. It should grab the list of hikes from the Model, and then send them to the view.
    const hikeList = this.hikesModel.getAllHikes();
    // send the list of hikes and the element we would like those placed into to the view.
    this.hikesView.renderHikeList(this.parentElement, hikeList);
    // after the hikes have been rendered...add our listener
    this.addHikeListener();
  }

  showOneHike(hikeName) {
    // use this when you need to show just one hike...with full details
    const hike = this.hikesModel.getHikeByName(hikeName);
    this.hikesView.renderOneHikeFull(
      this.parentElement,
      hike
    ).ontouchend = () => {
      this.showHikeList();
    };
  }
  addHikeListener() {
    // for the stretch you will need to attach a listener to each of the listed hikes to watch for a touchend. 
    const childrenArray = Array.from(this.parentElement.children);
    childrenArray.forEach(child => {
      child.addEventListener('touchend', e => {
        // why currentTarget instead of target?
        this.showOneHike(e.currentTarget.dataset.name);
      });
    });
  }
}