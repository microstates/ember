// BEGIN-SNIPPET node
class Node {
  counter = Number;
  isOpen = Boolean;
  children = [Node];
  addChild() {
    return this.children.push({}).isOpen.set(true);
  }
}
// END-SNIPPET

export default Node;