import { inViewport } from '@lib/utils';

let requestAnimFrame: any;
let cancelAnimFrame: any;

const hide = (el: HTMLElement | SVGSVGElement) => void (el.style.opacity = '0');
const show = (el: HTMLElement | SVGSVGElement) => void (el.style.opacity = '1');

export class Drawing {
  el: SVGSVGElement;
  image: HTMLElement | null;
  currentFrame: number;
  totalFrames: number;
  path: SVGPathElement[];
  length: number[];
  handle: number;
  rendered?: boolean;

  constructor(el: SVGSVGElement) {
    this.el = el;
    this.image = this.el.previousSibling as HTMLElement;
    this.currentFrame = 0;
    this.totalFrames = 160;
    this.path = [];
    this.length = [];
    this.handle = 0;
    this.init();
  }

  init() {
    this.el.querySelectorAll('path').forEach((path, i) => {
      this.path[i] = path;
      const length = this.path[i].getTotalLength();
      this.length[i] = length;
      this.path[i].style.strokeDasharray = `${length} ${length}`;
      this.path[i].style.strokeDashoffset = length as any;
    });
  }

  render() {
    if (this.rendered) return;
    this.rendered = true;
    this.draw();
  }

  draw() {
    const progress = this.currentFrame / this.totalFrames;
    if (1 < progress) {
      cancelAnimFrame(this.handle);
      this.showImage();
    } else {
      this.currentFrame++;
      for (let j = 0, len = this.path.length; j < len; j++) {
        this.path[j].style.strokeDashoffset = Math.floor(
          this.length[j] * (1 - progress)
        ) as any;
      }
      this.handle = requestAnimFrame(() => {
        this.draw();
      });
    }
  }

  showImage() {
    if (this.image) {
      show(this.image);
      hide(this.el);
    }
  }
}

export const drawing = () => {
  let didScroll = false;
  let resizeTimeout: any;
  const svgs = document.querySelectorAll('svg.draw');
  const drawings = Array.from(svgs).map(el => new Drawing(el as any));

  const scrollPage = () => {
    svgs.forEach((el, i) => {
      if (inViewport((el.parentNode as HTMLElement), 0.5)) {
        drawings[i].render();
      }
    });
    didScroll = false;
  };
  const handleScroll = () => {
    console.log('SCROOLLLLLED');
    if (!didScroll) {
      didScroll = true;
      setTimeout(() => {
        scrollPage();
      }, 60);
    }
  };
  const handleResize = () => {
    function delayed() {
      scrollPage();
      resizeTimeout = null;
    }
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(delayed, 200);
  };

  requestAnimFrame = (() =>
    (window as any).requestAnimationFrame ||
    (window as any).webkitRequestAnimationFrame ||
    (window as any).mozRequestAnimationFrame ||
    (window as any).oRequestAnimationFrame ||
    (window as any).msRequestAnimationFrame ||
    ((cb: any) => {
      window.setTimeout(cb, 1000 / 60);
    }))();

  cancelAnimFrame = (() =>
    (window as any).cancelAnimationFrame ||
    (window as any).webkitCancelAnimationFrame ||
    (window as any).mozCancelAnimationFrame ||
    (window as any).oCancelAnimationFrame ||
    (window as any).msCancelAnimationFrame ||
    ((id: any) => {
      window.clearTimeout(id);
    }))();

  // Handle the svgs already shown.
  svgs.forEach((el, i) => {
    setTimeout(
      (el => () => {
        if (inViewport(el.parentNode as HTMLElement)) {
          drawings[i].render();
        }
      })(el),
      250
    );
  });

  window.addEventListener('scroll', handleScroll, false);
  window.addEventListener('resize', handleResize, false);
};
