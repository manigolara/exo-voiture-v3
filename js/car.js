var Car = {
  /**
   * Properties
   * ---------------------------------------------
   */
  /**
   * Public functions
   * ---------------------------------------------
   */
  create: function () {
    this.type = null;
    this.color = null;
    this.colorFilter = null;
    this.speed = null;
    this.imgPath = null;
    this.boardTop = null;
    this.boardContainerEl = null;
    this.boardImgEl = null;
    this.deleteEl = null;
    return Object.create(this);
  },
};
/**
 * Private functions
 * ---------------------------------------------
 */
