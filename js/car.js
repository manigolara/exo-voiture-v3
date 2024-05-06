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
    return Object.create(this);
  },
};
/**
 * Private functions
 * ---------------------------------------------
 */
