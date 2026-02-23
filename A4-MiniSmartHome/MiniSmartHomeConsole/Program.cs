using System;
using MiniSmartHomeLib;

namespace MiniSmartHomeConsole
{
    /*
     * Console demo for the Mini Smart Home library.
     * 
     * Demonstrates:
     * - Power rules enforced by PowerModule
     * - Inheritance via SmartDevice
     * - Polymorphism via DeviceGroup
     */
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== Mini Smart Home Demo ===");

            // Create a SmartLight
            var light = new SmartLight("L-001", "Kitchen Light");

            // Intentional error: turning on while offline
            try
            {
                Console.WriteLine("Attempting to turn on while offline...");
                light.TurnOn();
            }
            catch (InvalidOperationException ex)
            {
                Console.WriteLine($"Caught error: {ex.Message}");
            }

            // Normal usage flow
            light.Rename("Kitchen Main Light");
            light.SetOnline(true);
            light.TurnOn();
            light.SetBrightness(75);

            Console.WriteLine("Single device status:");
            Console.WriteLine(light.GetStatus());

            // Demonstrate polymorphism with DeviceGroup
            var group = new DeviceGroup();
            group.AddDevice(light);

            Console.WriteLine("Turning off all devices via DeviceGroup...");
            group.TurnOffAll();

            Console.WriteLine("Statuses after TurnOffAll:");
            group.PrintStatuses();

            Console.WriteLine("=== End Demo ===");
        }
    }
}
