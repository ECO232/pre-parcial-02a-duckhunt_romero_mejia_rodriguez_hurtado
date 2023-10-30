//int controllerInput[3] = {0, 0, 0};

void setup()
{
  Serial.begin(9600);
  pinMode(A0, INPUT);
  pinMode(A1, INPUT);
  pinMode(7, INPUT);
  
}

void loop()
{
  int valueX = analogRead(A1);
  Serial.print("X Poten:");
  Serial.println(valueX);
  //controllerInput[0] = valueX;
  
  int valueY = analogRead(A0);
  Serial.print("Y Poten:");
  Serial.println(valueY);
  //controllerInput[1] = valueY;

  bool fire = digitalRead(7);
  Serial.print("Fire: ");
  Serial.println(fire);
  //controllerInput[2] = fire;
  
  //Serial.print("ConIn: ");
  //Serial.println(controllerInput);
  delay(300);
}