using System;

namespace MiniSmartHomeLib
{
    public class SmartLight : SmartDevice
    {
        private int _brightness;

        public SmartLight(string deviceId, string name) : base(deviceId, name)
        {
            _brightness = 0;
        }

        public void SetBrightness(int value)
        {
            if (value < 0 || value > 100)
                throw new ArgumentException("Brightness must be between 0 and 100.", nameof(value));

            if (!Power.IsPoweredOn)
                throw new InvalidOperationException("Cannot set brightness unless the device is powered on.");

            _brightness = value;
        }

        public override string GetStatus()
        {
            return $"SmartLight | Id={DeviceId}, Name={Name}, Online={Power.IsOnline}, PoweredOn={Power.IsPoweredOn}, Brightness={_brightness}";
        }
    }
}
