class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVamp = 0;
    let currentVamp = this;

    while(currentVamp.creator) {
      currentVamp = currentVamp.creator;
      numberOfVamp++;
    }

    return numberOfVamp;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    }
    return false;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let vampMain = this;

    if (vampMain.numberOfVampiresFromOriginal === 0) {
      return vampMain;
    } else if (vampire.numberOfVampiresFromOriginal === 0) {
      return vampire;
    }

    while(vampMain.numberOfVampiresFromOriginal !== vampire.numberOfVampiresFromOriginal) {
      if (vampMain.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
        vampire = vampire.creator;
      } else {
        vampMain = vampMain.creator;
      }
    }

    if (vampMain.name === vampire.name) {
      return vampMain;
    }

    while(vampMain.name !== vampire.name) {
      vampMain = vampMain.creator;
      vampire = vampire.creator;
    }
    return vampMain;
  }
}

module.exports = Vampire;


// rootVampire = new Vampire("root");

// offspring1 = new Vampire("a");
// offspring2 = new Vampire("b");
// offspring3 = new Vampire("c");
// offspring4 = new Vampire("d");
// offspring5 = new Vampire("e");
// offspring6 = new Vampire("f");
// offspring7 = new Vampire("g");
// offspring8 = new Vampire("h");

// rootVampire.addOffspring(offspring1);
// rootVampire.addOffspring(offspring2);
// rootVampire.addOffspring(offspring3);
// offspring3.addOffspring(offspring4);
// offspring3.addOffspring(offspring5);
// offspring5.addOffspring(offspring6);
// offspring6.addOffspring(offspring7);
// offspring2.addOffspring(offspring8);


// // console.log(rootVampire.closestCommonAncestor(offspring3).name);
// console.log(offspring1.closestCommonAncestor(offspring2).name);