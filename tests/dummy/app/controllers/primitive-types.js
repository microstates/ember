import Controller from "@ember/controller";

export default Controller.extend({
  treeInitial: {
    children: [
      {
        children: [
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        children: [
                          { children: [{}], isOpen: true, counter: 3 }
                        ],
                        isOpen: true
                      }
                    ],
                    isOpen: true,
                    counter: 1
                  }
                ],
                isOpen: true,
                counter: 1
              }
            ],
            isOpen: true,
            counter: 1
          }
        ],
        isOpen: true,
        counter: 1
      }
    ],
    isOpen: true
  }
});
