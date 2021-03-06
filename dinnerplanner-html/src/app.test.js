var assert = chai.assert;
var expect = chai.expect;

GSC = () => {};

describe("DinnerPlanner App", () => {
  let model = null;
  let homeView = null;
  let searchView = null;
  let overviewView = null;
  let detailsView = null;
  let detailsViewController = null;

  beforeEach(() => {
    model = new DinnerModel();
    homeView = new HomeView(document.querySelector("#page-content"));
    searchView = new SearchView(document.querySelector("#page-content"), model);
    overviewView = new OverviewView(document.querySelector("#page-content-overview"), model);
    detailsView = new DishDetailsView(document.querySelector("#container-details"), model);
  });

  describe("Home View", () => {
    it("has the start button", () => {
      homeView.render();
      const button = document.getElementById("startBtn");
      expect(button).to.not.be.a("null");
    });
  });

  describe("Search view", () => {
    beforeEach(async () => {
      let dish = await model.getDish(559251);
      model.addDishToMenu(dish);
      searchView.render();
    })

    it("has a sidebar", () => {
      const sidebar = document.getElementById("sideBarView");
      expect(sidebar).to.not.be.a("null");
    });

    it("has a dish search container", () => {
      const dishSearch = document.getElementById("dishSearchView");
      expect(dishSearch).to.not.be.a("null");
    });

    it("displays a loading message", (done) => {
      const loader = document.getElementById("loader");
      expect(loader).to.not.be.a("null");
        done();
    }).timeout(3000);

    it("displays dishes", (done) => {
      const dishes = document.getElementById("dishItems");
      expect(dishes).to.not.be.a("null");
      done();
    }).timeout(3000);

    it("Has a number of guests value", () => {
      const valueHolders = document.getElementsByClassName("value-num-guests");
      expect(valueHolders.length).to.be.above(0);
      for (let v of valueHolders) {
        expect(v).to.not.be.a("null");
        expect(v.innerHTML).to.equal(""+model.getNumberOfGuests());
      }
    });

    it("Has data on current dishes", () => {
      const valueHolders = document.getElementsByClassName("value-main-course-name");
      expect(valueHolders.length).to.be.above(0);
      for (let v of valueHolders) {
        expect(v).to.not.be.a("null");
        expect(v.innerHTML).to.equal("Breakfast Pizza");
      }
    });

    it("Displays the total price correctly", () => {
      const valueHolders = document.getElementsByClassName("value-total-price");
      expect(valueHolders.length).to.be.above(0);
      for (let v of valueHolders) {
        expect(v).to.not.be.a("null");
        expect(v.innerHTML).to.equal(""+model.getTotalMenuPrice());
      }
    });
  });

  describe("Confirmation page", () => {
    beforeEach(async () => {
      let dish = await model.getDish(559251);
      model.addDishToMenu(dish);
      overviewView.render();
    });

    it("exists", () => {
      const overviewContainer = document.getElementById("overviewView");
      expect(overviewView).to.not.be.a("null");
    });

    it("has a print button", () => {
      const printBtn = document.getElementById("toPrintBtn");
      expect(printBtn).to.not.be.a("null");
    });


    it("Has a number of guests value", () => {
      const valueHolders = document.getElementsByClassName("value-num-guests");
      expect(valueHolders.length).to.be.above(0);
      for (let v of valueHolders) {
        expect(v).to.not.be.a("null");
        expect(v.innerHTML).to.equal(""+model.getNumberOfGuests());
      }
    });

    it("Has data on current dishes", () => {
      const valueHolders = document.getElementsByClassName("value-main-course-name");
      expect(valueHolders.length).to.be.above(0);
      for (let v of valueHolders) {
        expect(v).to.not.be.a("null");
        expect(v.innerHTML).to.equal("Breakfast Pizza");
      }
    });

    it("Displays the total price correctly", () => {
      const valueHolders = document.getElementsByClassName("value-total-price");
      expect(valueHolders.length).to.be.above(0);
      for (let v of valueHolders) {
        expect(v).to.not.be.a("null");
        expect(v.innerHTML).to.equal(""+model.getTotalMenuPrice());
      }
    });
  });
  

  describe("Details page", () => {
    beforeEach(async () => {
      let dish = await model.getDish(559251);
      model.setRecipeDetailsDish(dish);
      detailsView.render();
      detailsViewController = new DishDetailsViewController(detailsView, model)
    });

    it("updates the model on interaction", (done) => {
      const addToMenuButton = document.getElementById("add-to-menu-button");
      expect(addToMenuButton).to.not.be.a("null");
      addToMenuButton.click();
      model.getDish(559251)
      .then((dish) => {
        expect(model.getFullMenu().length).to.equal(1);
        expect(model.getFullMenu()[0].id).to.equal(559251);
        expect(model.getFullMenu()[0].title).to.equal(dish.title)
        done();
      })
      }).timeout(5000);

    it("displays the changes after interaction", () => {
      const addToMenuButton = document.getElementById("add-to-menu-button");
      expect(addToMenuButton).to.not.be.a("null");
      addToMenuButton.click();
      const dishlistelem = document.getElementsByClassName("value-main-course-name"); 
      for (let d of dishlistelem) {
        expect(d).to.not.be.a("null");
        expect(d.innerHTML).to.equal("Breakfast Pizza");
      } 
    });
  })
});