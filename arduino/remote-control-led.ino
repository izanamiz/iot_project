#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"
#include <ArduinoJson.h>

// GPIO 5 D1
#define LED D1
#define FAN D2
#define LDR A0
#define DHTPIN D4
#define DHTTYPE DHT11

// WiFi
const char *ssid = "=.=";           // Enter your WiFi name
const char *password = "nar_1010";  // Enter WiFi password

// MQTT Broker
const char *mqtt_broker = "broker.hivemq.com";
const char *led_topic = "led_demo";
const char *fan_topic = "fan_demo";
const char *sensor_topic = "sensor_demo";
const int mqtt_port = 1883;

bool ledState = false;
bool fanState = false;
long lastMsg = 0;

WiFiClient espClient;
PubSubClient client(espClient);
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  // Set software serial baud to 115200;
  Serial.begin(115200);
  delay(1000);  // Delay for stability

  // Connecting to a WiFi network
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to the WiFi network");

  // Setting LED pin as output
  pinMode(LED, OUTPUT);
  digitalWrite(LED, LOW);  // Turn off the LED initially

  // Setting FAN pin as output
  pinMode(FAN, OUTPUT);
  digitalWrite(FAN, LOW);  // Turn off the LED initially

  // Connecting to an MQTT broker
  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(callback);
  while (!client.connected()) {
    String client_id = "clientId-TnihOlfFqv";
    client_id += String(WiFi.macAddress());
    Serial.printf("The client %s connects to the public MQTT broker\n", client_id.c_str());
    if (client.connect(client_id.c_str())) {
      Serial.println("Public Hive MQTT broker connected");
    } else {
      Serial.print("Failed with state ");
      Serial.print(client.state());
      delay(2000);
    }
  }

  // Publish and subscribe
  client.subscribe(led_topic);
  client.subscribe(fan_topic);

  dht.begin();
}

void callback(char *topic, byte *payload, unsigned int length) {
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
  Serial.print("Message: ");
  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];  // Convert *byte to string
  }
  Serial.print(message);

  if (strcmp(topic, led_topic) == 0) {
    if (message == "on" && !ledState) {
      digitalWrite(LED, HIGH);  // Turn on the LED
      ledState = true;
    }
    if (message == "off" && ledState) {
      digitalWrite(LED, LOW);  // Turn off the LED
      ledState = false;
    }
  }

  if (strcmp(topic, fan_topic) == 0) {
    if (message == "on" && !fanState) {
      digitalWrite(FAN, HIGH);  // Turn on the LED
      fanState = true;
    }
    if (message == "off" && fanState) {
      digitalWrite(FAN, LOW);  // Turn off the LED
      fanState = false;
    }
  }

  Serial.println();
  Serial.println("-----------------------");
}

void publishSensorData() {
  int ldr_val = analogRead(LDR);
  float temp = dht.readTemperature();
  float humd = dht.readHumidity();

  // Tạo một đối tượng JSON
  DynamicJsonDocument jsonDoc(256);  // Điều chỉnh kích thước đối tượng JSON tùy theo nhu cầu

  // Đặt giá trị trong đối tượng JSON
  jsonDoc["temperature"] = temp;
  jsonDoc["humidity"] = humd;
  jsonDoc["light"] = ldr_val;

  // Chuyển đối tượng JSON thành một chuỗi JSON
  String jsonStr;
  serializeJson(jsonDoc, jsonStr);

  // Publish chuỗi JSON lên MQTT topic "sensor_demo"
  client.publish(sensor_topic, jsonStr.c_str());
}

void loop() {
  client.loop();

  publishSensorData();
  delay(2000);  // Delay for a short period in each loop iteration
}
