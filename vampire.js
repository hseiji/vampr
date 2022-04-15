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
    let result = {};

    // console.log(this.name);
    if (this.name === name) {
      // console.log("equals");
      result = this;
      return result;
    }

    for (const vamp of this.offspring) {
      result = vamp.vampireWithName(name);
      if (result) {
        return result
      }
    }
    if (Object.keys(result).length === 0) {
      return null;
    } else {
      return result;
    }
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let count = 0;

    // console.log(this.name);
    for (const vamp of this.offspring) {
      count++;
      count = count + vamp.totalDescendents;
    }

    return count;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let vamps = [];

    if (this.yearConverted > 1980) {
      vamps.push(this);
    }

    for (const vamp of this.offspring) {
      vamps = vamps.concat(vamp.allMillennialVampires);
    }

    return vamps;
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

rootVampire = new Vampire("root");
offspring1 = new Vampire("a", 1000);
offspring2 = new Vampire("b", 900);
offspring3 = new Vampire("c", 1400);
offspring4 = new Vampire("d", 1890);
offspring5 = new Vampire("e", 1990);
offspring6 = new Vampire("f", 2000);
offspring7 = new Vampire("g", 2010);
offspring8 = new Vampire("h", 2017);

rootVampire.addOffspring(offspring1);
rootVampire.addOffspring(offspring2);
rootVampire.addOffspring(offspring3);
offspring3.addOffspring(offspring4);
offspring3.addOffspring(offspring5);
offspring5.addOffspring(offspring6);
offspring6.addOffspring(offspring7);
offspring2.addOffspring(offspring8);

console.log(rootVampire.allMillennialVampires);