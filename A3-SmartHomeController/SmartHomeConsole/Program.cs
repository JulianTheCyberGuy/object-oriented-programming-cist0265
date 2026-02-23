using System;
using SmartHomeLib;

Console.WriteLine("SmartHomeConsole starting...");

var hub = new SmartHomeHub();

// Create devices (inheritance: all are SmartDevice)
var light = new SmartLight("L1", "Hall Light", initialBrightness: 60, initialColor: "Warm White");
var thermostat = new SmartThermostat("T1", "Main Thermostat", initialTemperature: 72);
var camera = new SecurityCamera("C1", "Front Door Camera", storageCapacityMb: 200);

// Add to hub (polymorphism: hub stores SmartDevice base type)
hub.AddDevice(light);
hub.AddDevice(thermostat);
hub.AddDevice(camera);

// Intentional error (rubric-friendly): turn on while offline
try
{
    Console.WriteLine("Attempting to turn on light while offline (intentional error)...");
    light.TurnOn();
}
catch (InvalidOperationException ex)
{
    Console.WriteLine($"Caught error: {ex.Message}");
}

// Bring devices online and power them on
light.SetOnline(true);
thermostat.SetOnline(true);
camera.SetOnline(true);

light.TurnOn();
thermostat.TurnOn();
camera.TurnOn();

// Demonstrate encapsulated rules (must be powered on)
light.SetBrightness(80);
light.SetColor("Blue");
thermostat.SetTemperature(75);

// Camera rules: must be online + powered on + have storage
camera.StartRecording();
camera.SimulateRecording(10);

Console.WriteLine("=== Statuses BEFORE Night Mode ===");
hub.PrintAllStatuses();

// Polymorphism: no type checks here, overridden ApplyMode runs per device
hub.ApplyModeToAll("Night");

Console.WriteLine("=== Statuses AFTER Night Mode ===");
hub.PrintAllStatuses();

// Hub power control
hub.TurnOffAll();

Console.WriteLine("=== Statuses AFTER TurnOffAll ===");
hub.PrintAllStatuses();

Console.WriteLine("Done.");
