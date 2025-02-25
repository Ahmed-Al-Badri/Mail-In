let Settings = {
  base: 1,
  inner: 4,
};

const dirs = ["top", "right", "bottom", "left"];
const class_ = ["column", "row", "-reverse"];

function get_dir(direction) {
  return dirs[direction];
}
function get_class_css(direction, a = " ") {
  direction = Settings[direction];
  let hold = "";
  if (direction % 2) {
    hold += class_[0];
  } else {
    hold += class_[1];
  }
  if (direction > 1 && direction < 4) {
    hold += a + class_[2];
  }
  return hold;
}

function get_flex_direction(direction) {
  return get_class_css(direction, "");
}

class Setting {
  constructor() {
    this.dos = {};
    this.keys = {};
    this.open_keys = {};
    this.set_up();
  }

  set_up() {
    Object.entries(Settings).map(([type]) => {
      this.dos[type] = [];
      this.keys[type] = 0;
      this.open_keys[type] = [];
    });
  }

  append(base, effect) {
    let hold = this.open_keys[base].pop() || this.keys[base]++;
    this.dos[base][hold] = effect;
    return hold;
  }

  depend(base, key) {
    this.open_keys[base].push(key);
    this.dos[base][key] = undefined;
  }

  onEffect(base) {
    this.dos[base].map((res) => {
      if (res != undefined) {
        res();
      }
    });
  }
}

const Settings_ = new Setting();

export default Settings_;
export { Settings, get_class_css, get_dir, get_flex_direction };
