void setup() {
  size(600, 600, P3D);
  noStroke();
}

void draw() {
  background(30);
  lights();

  float t = millis() / 1000.0;
  float x = sin(t) * 100;
  float y = cos(t * 1.5) * 75;
  float scaleFactor = 1 + 0.5 * sin(t * 2);

  pushMatrix();
  translate(width / 2 + x, height / 2 + y, 0);
  rotateX(t);
  rotateY(t * 1.2);
  scale(scaleFactor);
  fill(0, 255, 100);
  sphere(50);
  popMatrix();
}
