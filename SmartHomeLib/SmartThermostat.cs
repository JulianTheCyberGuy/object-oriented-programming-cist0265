using System;

namespace SmartHomeLib;

public class SmartThermostat : SmartDevice
{
    private int _temperature; // 50–90

    public SmartThermostat(string deviceId, string name, int initialTemperature = 70)
        : base(deviceId, name)
    {
        if (initialTemperature < 50 || initialTemperature > 90)
            throw new ArgumentException("Temperature must be between 50 and 90.", nameof(initialTemperature));

        _temperature = initialTemperature;
    }

    public void SetTemperature(int temp)
    {
        if (temp < 50 || temp > 90)
            throw new ArgumentException("Temperature must be between 50 and 90.", nameof(temp));

        if (!IsPoweredOn)
            throw new InvalidOperationException("Cannot set temperature unless the thermostat is powered on.");

        _temperature = temp;
    }

    public override void ApplyMode(string mode)
    {
        if (string.Equals(mode, "Night", StringComparison.OrdinalIgnoreCase) && IsPoweredOn)
        {
            _temperature = 65;
        }
    }

    public override string GetStatus()
    {
        return $"SmartThermostat | Id={DeviceId}, Name={Name}, Online={IsOnline}, PoweredOn={IsPoweredOn}, Setpoint={_temperature}";
    }
}
