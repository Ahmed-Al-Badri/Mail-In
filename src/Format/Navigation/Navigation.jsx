class Navigation {
  constructor() {
    this.href = "";
    this.dos = [];
    this.cur = 0;
    this.free_cur = [];
    //console.log("hh");
    this.setup();
  }

  setup() {
    window.addEventListener("popstate", (info) => {
      //console.log("data");
      this.href = window.location.pathname.replace("/", "");
      this.dos_all();
      //this.move_to(window.location.pathname.replace("/", ""));
    });
  }

  append(dos_) {
    let hold = this.free_cur.pop() || this.cur++;
    this.dos[hold] = dos_;
    //dos_(window.location.pathname);
    return hold;
  }
  remove(key) {
    this.dos[key] = undefined;
    this.free_cur.push(key);
    return key;
  }

  move_to(back = "", front = "") {
    if (back != "") {
      if (front != "") {
        back += "/" + front;
      }
    } else {
      back = front;
    }
    if (this.href != back) {
      if (window.location.pathname != back) {
        window.history.pushState(undefined, undefined, "/" + back);
      }
      this.href = back;
      //console.log("set href " + this.href);
      this.dos_all();
    }
  }

  dos_all() {
    this.dos.map((res) => {
      if (res != undefined) {
        res(this.href);
      }
    });
  }
}

const Navigate = new Navigation();

export default Navigate;
