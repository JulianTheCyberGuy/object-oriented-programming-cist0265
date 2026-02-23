using System;

namespace SmartHomeLib;

public class SmartLight : SmartDevice
{
    private int _brightness; // 0–100
    private string _color;

    public SmartLight(string deviceId, string name, int initialBrightness = 50, string initialColor = "White")
        : base(deviceId, name)
    {
        if (initialBrightness < 0 || initialBrightness > 100)
            throw new ArgumentException("Brightness must be between 0 and 100.", nameof(initialBrightness));

        if (string.IsNullOrWhiteSpace(initialColor))
            throw new ArgumentException("Color cannot be blank.", nameof(initialColor));

        _brightness = initialBrightness;
        _color = initialColor.Trim();
    }

    public void SetBrightness(int value)
    {
        if (value < 0 || value > 100)
            throw new ArgumentException("Brightness must be between 0 and 100.", nameof(value));

        if (!IsPoweredOn)
            throw new InvalidOperationException("Cannot set brightness unless the light is powered on.");

        _brightness = value;
    }

    public void SetColor(string color)
    {
        if (string.IsNullOrWhiteSpace(color))
            throw new ArgumentException("Color cannot be blank.", nameof(color));

        if (!IsPoweredOn)
            throw new InvalidOperationException("Cannot set color unless the light is powered on.");

        _color = color.Trim();
    }

    public override void ApplyMode(string mode)
    {
        if (string.Equals(mode, "Night", StringComparison.OrdinalIgnoreCase) && IsPoweredOn)
        {
            _brightness = 10;
        }
    }

    public override string GetStatus()
    {
        return $"SmartLight | Id={DeviceId}, Name={Name}, Online={IsOnline}, PoweredOn={IsPoweredOn}, Brightness={_brightness}, Color={_color}";
    }
}
