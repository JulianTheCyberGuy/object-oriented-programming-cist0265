using System;

namespace MiniSmartHomeLib
{
    /*
     * SmartLight
     * ----------
     * A specific type of SmartDevice.
     * 
     * INHERITANCE:
     * SmartLight IS-A SmartDevice.
     * 
     * Adds brightness behavior unique to lights.
     */
    public class SmartLight : SmartDevice
    {
        // Encapsulated brightness value (0–100)
        private int _brightness;

        /*
         * Constructor
         * Passes identity data to the base SmartDevice constructor.
         */
        public SmartLight(string deviceId, string name)
            : base(deviceId, name)
        {
            _brightness = 0;
        }

        /*
         * Sets the brightness level.
         * 
         * Rules:
         * - Must be between 0 and 100
         * - Device must be powered on
         */
        public void SetBrightness(int value)
        {
            if (value < 0 || value > 100)
                throw new ArgumentException("Brightness must be between 0 and 100.", nameof(value));

            if (!Power.IsPoweredOn)
                throw new InvalidOperationException("Cannot set brightness unless powered on.");

            _brightness = value;
        }

        /*
         * Returns a formatted status string for this light.
         * Overrides abstract method from SmartDevice.
         */
        public override string GetStatus()
        {
            return $"SmartLight | Id={DeviceId}, Name={Name}, Online={Power.IsOnline}, PoweredOn={Power.IsPoweredOn}, Brightness={_brightness}";
        }
    }
}
