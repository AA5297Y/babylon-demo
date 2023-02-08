import { Image } from "@babylonjs/gui/2D/controls/image";
import unit from "@/assets/unit.png";

export default class SpriteTool {
  static init(image: Image) {
    image.source = unit;
    image.width = "24px";
    image.height = "24px";
    image.cellWidth = 64;
    image.cellHeight = 64;
    image.stretch = Image.STRETCH_UNIFORM;
  }

  static unknowAir(image: Image) {
    if (image.cellId == 0) {
      return;
    }

    image.cellId = 0;
  }

  static friendlyAir(image: Image) {
    if (image.cellId == 1) {
      return;
    }
    
    image.cellId = 1;
  }

  static alyAir(image: Image) {
    if (image.cellId == 2) {
      return;
    }
    
    image.cellId = 2;
  }

  static unFriendlyAir(image: Image) {
    if (image.cellId == 3) {
      return;
    }
    
    image.cellId = 3;
  }

  static enemeyAir(image: Image) {
    if (image.cellId == 4) {
      return;
    }
    
    image.cellId = 4;
  }

  static unknowProjectile(image: Image) {
    if (image.cellId == 5) {
      return;
    }
    
    image.cellId = 5;
  }

  static friendlyProjectile(image: Image) {
    if (image.cellId == 6) {
      return;
    }
    
    image.cellId = 6;
  }

  static alyProjectile(image: Image) {
    if (image.cellId == 7) {
      return;
    }
    
    image.cellId = 7;
  }

  static unFriendlyProjectile(image: Image) {
    if (image.cellId == 8) {
      return;
    }
    
    image.cellId = 8;
  }

  static enemeyProjectile(image: Image) {
    if (image.cellId == 9) {
      return;
    }
    
    image.cellId = 9;
  }

  static unknowSurface(image: Image) {
    if (image.cellId == 10) {
      return;
    }
    
    image.cellId = 10;
  }

  static friendlySurface(image: Image) {
    if (image.cellId == 11) {
      return;
    }
    
    image.cellId = 11;
  }

  static alySurface(image: Image) {
    if (image.cellId == 12) {
      return;
    }
    
    image.cellId = 12;
  }

  static unFriendlySurface(image: Image) {
    if (image.cellId == 13) {
      return;
    }
    
    image.cellId = 13;
  }

  static enemeySurface(image: Image) {
    if (image.cellId == 14) {
      return;
    }
    
    image.cellId = 14;
  }

  static unknowUnderWater(image: Image) {
    if (image.cellId == 15) {
      return;
    }
    
    image.cellId = 15;
  }

  static friendlyUnderWater(image: Image) {
    if (image.cellId == 16) {
      return;
    }
    
    image.cellId = 16;
  }

  static alyUnderWater(image: Image) {
    if (image.cellId == 17) {
      return;
    }
    
    image.cellId = 17;
  }

  static unFriendlyUnderWater(image: Image) {
    if (image.cellId == 18) {
      return;
    }
    
    image.cellId = 18;
  }

  static enemeyUnderWater(image: Image) {
    if (image.cellId == 19) {
      return;
    }
    
    image.cellId = 19;
  }
}