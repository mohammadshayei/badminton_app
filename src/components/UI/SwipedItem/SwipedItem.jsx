import "./SwipedItem.scss";
import React from "react";

const LeftSwipedCmp = props => {
  return (
    <>
      <p>حذف</p>
    </>
  )
}
const RightSwipedCmp = props => {
  return (
    <>
      <p>ویرایش</p>
    </>
  )
}

class SwipedItem extends React.Component {
  // DOM Refs
  listElement;
  wrapper;
  background;

  // Drag & Drop
  dragStartX = 0;
  left = 0;
  right = 0;
  dragged = false;

  // FPS Limit
  startTime;
  fpsInterval = 1000 / 60;

  constructor(props) {
    super(props);

    this.listElement = null;
    this.wrapper = null;
    this.background = null;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onDragStartMouse = this.onDragStartMouse.bind(this);
    this.onDragStartTouch = this.onDragStartTouch.bind(this);
    this.onDragEndMouse = this.onDragEndMouse.bind(this);
    this.onDragEndTouch = this.onDragEndTouch.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.onClicked = this.onClicked.bind(this);

    this.onSwiped = this.onSwiped.bind(this);
    this.onLeftSwiped = this.onLeftSwiped.bind(this);
    this.onRightSwiped = this.onRightSwiped.bind(this);

    this.state = {
      swipeMode: 'left'
    }

  }

  componentDidMount() {
    window.addEventListener("mouseup", this.onDragEndMouse);
    window.addEventListener("touchend", this.onDragEndTouch);
  }

  componentWillUnmount() {
    window.removeEventListener("mouseup", this.onDragEndMouse);
    window.removeEventListener("touchend", this.onDragEndTouch);
  }

  onDragStartMouse(evt) {
    this.onDragStart(evt.clientX);
    window.addEventListener("mousemove", this.onMouseMove);
  }

  onDragStartTouch(evt) {
    const touch = evt.targetTouches[0];
    this.onDragStart(touch.clientX);
    window.addEventListener("touchmove", this.onTouchMove);
  }

  onDragStart(clientX) {
    this.dragged = true;
    this.dragStartX = clientX;
    this.listElement.className = "ListItem";
    this.startTime = Date.now();
    requestAnimationFrame(this.updatePosition);
  }

  onDragEndMouse(evt) {
    window.removeEventListener("mousemove", this.onMouseMove);
    this.onDragEnd();
  }

  onDragEndTouch(evt) {
    window.removeEventListener("touchmove", this.onTouchMove);
    this.onDragEnd();
  }

  onDragEnd() {
    if (this.dragged) {
      this.dragged = false;

      const threshold = this.props.threshold || 0.3;
      if (this.left < 0) {
        if (this.left < this.listElement.offsetWidth * threshold * -1) {
          this.left = -this.listElement.offsetWidth * 2;
          this.wrapper.style.maxHeight = 0;
          this.onLeftSwiped();


        } else {
          this.left = 0;
        }
      }
      else {
        if (this.right > this.listElement.offsetWidth * threshold) {
          this.right = this.listElement.offsetWidth * 2;
          this.wrapper.style.maxHeight = 0;
          this.onRightSwiped();
        } else {
          this.right = 0;

        }
      }

      this.listElement.className = "bouncing-list-item";
      this.listElement.style.transform = `translateX(${this.left < 0 ? this.left : this.right}px)`;
    }
  }

  onMouseMove(evt) {
    const diff = evt.clientX - this.dragStartX;
    // console.log(`clinetx ${evt.clientX} dragstartx ${this.dragStartX} left ${left}`)
    if (diff < 0) {
      this.left = diff;
    }
    else {
      this.right = diff
    }
  }

  onTouchMove(evt) {
    const touch = evt.targetTouches[0];
    const diff = touch.clientX - this.dragStartX;
    if (diff < 0) {
      this.left = diff;
    }
    else {
      this.right = diff
    }
  }

  updatePosition() {
    if (this.dragged) requestAnimationFrame(this.updatePosition);
    const now = Date.now();
    const elapsed = now - this.startTime;
    if (this.dragged && elapsed > this.fpsInterval) {
      this.setState({
        swipeMode: this.left < 0 ? 'left' : 'right'
      })
      this.background.style.justifyContent = this.left < 0 ? 'flex-end' : 'flex-start'
      this.listElement.style.transform = this.left < 0 ? `translateX(${this.left}px)` :
        `translateX(${this.right}px)`;
      let opacity = this.left < 0 ? (Math.abs(this.left) / 100).toFixed(2) :
        (Math.abs(this.right) / 100).toFixed(2);
      if (opacity < 1 && opacity.toString() !== this.background.style.opacity) {
        this.background.style.opacity = opacity.toString();
      }
      if (opacity >= 1) {
        this.background.style.opacity = "1";
      }
      this.startTime = Date.now();
    }
  }

  onClicked() {
    if (this.props.onSwipe) {
      this.props.onSwipe();
    }
  }

  onSwiped() {
    if (this.props.onSwipe) {
      this.props.onSwipe();
    }
  }
  onLeftSwiped() {
    console.log('left swiped')

    if (this.props.onLeftSwiped) {
      this.props.onLeftSwiped();
    }
  }
  onRightSwiped() {
    console.log('right swiped')
    if (this.props.onRightSwiped) {
      this.props.onRightSwiped();
    }
  }
  render() {
    return (
      <>
        <div className="wrapper" ref={div => (this.wrapper = div)}>
          <div ref={div => (this.background = div)}
            className="background"
          >
            {
              this.state.swipeMode === 'left' ? <LeftSwipedCmp /> : <RightSwipedCmp />
            }
          </div>
          <div
            // onClick={this.onClicked}
            ref={div => (this.listElement = div)}
            onMouseDown={this.onDragStartMouse}
            onTouchStart={this.onDragStartTouch}
            className="listItem"
          >
            {this.props.children}
          </div>
        </div>
      </>
    );
  }
}

export default SwipedItem;
