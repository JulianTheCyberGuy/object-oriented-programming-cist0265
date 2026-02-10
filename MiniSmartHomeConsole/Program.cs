using System;
using MiniSmartHomeLib;

namespace MiniSmartHomeConsole
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== Mini Smart Home Demo ===");

            // Intentional error: TurnOn while offline
            var light = new SmartLight("L-001", "Kitchen Light");

            try
            {
                Console.WriteLine("Trying to turn on while offline (intentional error)...");
                light.TurnOn();
            }
            catch (InvalidOperationException ex)
            {
                Console.WriteLine($"Caught error: {ex.Message}");
            }

            // Normal flow
            light.Rename("Kitchen Main Light");
            light.SetOnline(true);
            light.TurnOn();
            light.SetBrightness(75);

            Console.WriteLine("Single device status:");
            Console.WriteLine(light.GetStatus());

            // DeviceGroup demo
            var group = new DeviceGroup();
            group.AddDevice(light);

            Console.WriteLine("Turning off all via DeviceGroup...");
            group.TurnOffAll();

            Console.WriteLine("Statuses after TurnOffAll:");
            group.PrintStatuses();

            Console.WriteLine("=== End Demo ===");
        }
    }
}
