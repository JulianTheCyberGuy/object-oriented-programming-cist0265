using System;
using System.Collections.Generic;

namespace MiniSmartHomeLib
{
    /*
     * DeviceGroup
     * -----------
     * Simple controller that works with SmartDevice base types.
     * 
     * Demonstrates POLYMORPHISM:
     * The group does not care what specific device type it holds.
     */
    public class DeviceGroup
    {
        // Internal list of devices (not exposed publicly)
        private readonly List<SmartDevice> _devices = new();

        /*
         * Adds a device to the group.
         * Rejects null devices and duplicate DeviceIds.
         */
        public void AddDevice(SmartDevice device)
        {
            if (device is null)
                throw new ArgumentException("Device cannot be null.", nameof(device));

            foreach (var existing in _devices)
            {
                if (existing.DeviceId == device.DeviceId)
                {
                    throw new ArgumentException($"Duplicate device id: {device.DeviceId}", nameof(device));
                }
            }

            _devices.Add(device);
        }

        /*
         * Turns off all devices in the group.
         */
        public void TurnOffAll()
        {
            foreach (var device in _devices)
            {
                device.TurnOff();
            }
        }

        /*
         * Prints the status of every device using polymorphism.
         */
        public void PrintStatuses()
        {
            foreach (var device in _devices)
            {
                Console.WriteLine(device.GetStatus());
            }
        }
    }
}
