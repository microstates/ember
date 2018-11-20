// BEGIN-SNIPPET node
class Node {
  counter = Number;
  isOpen = Boolean;
  children = [Node];
  addChild() {
    return this.children.push({}).isOpen.set(true);
  }

  get removeChild() {
    return child => this.children.filter(c => valueOf(c) !== valueOf(child));
  }
}
// END-SNIPPET

export default Node;