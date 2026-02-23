using System;

namespace MiniSmartHomeLib
{
    /*
     * SmartDevice (abstract)
     * ----------------------
     * Base class for all smart devices.
     * 
     * INHERITANCE (IS-A):
     * SmartLight IS-A SmartDevice.
     * 
     * This class defines shared identity, naming, and power behavior.
     */
    public abstract class SmartDevice
    {
        // Unique identifier for the device
        public string DeviceId { get; }

        // Human-readable device name
        public string Name { get; private set; }

        // COMPOSITION: every device owns a PowerModule
        public PowerModule Power { get; }

        /*
         * Constructor
         * Validates required values and creates the PowerModule.
         */
        protected SmartDevice(string deviceId, string name)
        {
            if (string.IsNullOrWhiteSpace(deviceId))
                throw new ArgumentException("DeviceId cannot be null or blank.", nameof(deviceId));

            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Name cannot be null or blank.", nameof(name));

            DeviceId = deviceId;
            Name = name;

            // Devices do NOT create their own power logic elsewhere
            Power = new PowerModule();
        }

        /*
         * Renames the device.
         * Rejects blank or whitespace names.
         */
        public void Rename(string newName)
        {
            if (string.IsNullOrWhiteSpace(newName))
                throw new ArgumentException("New name cannot be blank.", nameof(newName));

            Name = newName;
        }

        /*
         * Sets the device online/offline.
         * Delegates logic to PowerModule.
         */
        public virtual void SetOnline(bool online)
        {
            Power.SetOnline(online);
        }

        /*
         * Turns the device on.
         * Delegates validation to PowerModule.
         */
        public virtual void TurnOn()
        {
            Power.TurnOn();
        }

        /*
         * Turns the device off.
         */
        public virtual void TurnOff()
        {
            Power.TurnOff();
        }

        /*
         * Forces derived classes to describe their status.
         * Demonstrates polymorphism.
         */
        public abstract string GetStatus();
    }
}
