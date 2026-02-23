using System;
using System.Collections.Generic;
using System.Linq;

namespace SmartHomeLib;

public class SmartHomeHub
{
    private readonly List<SmartDevice> _devices = new();

    public void AddDevice(SmartDevice device)
    {
        if (device is null)
            throw new ArgumentException("Device cannot be null.", nameof(device));

        if (_devices.Any(d => d.DeviceId == device.DeviceId))
            throw new InvalidOperationException($"Duplicate DeviceId: {device.DeviceId}");

        _devices.Add(device);
    }

    public bool RemoveDevice(string deviceId)
    {
        if (string.IsNullOrWhiteSpace(deviceId))
            throw new ArgumentException("DeviceId cannot be blank.", nameof(deviceId));

        var device = _devices.FirstOrDefault(d => d.DeviceId == deviceId);
        if (device is null) return false;

        _devices.Remove(device);
        return true;
    }

    public void TurnOffAll()
    {
        foreach (var device in _devices)
            device.TurnOff();
    }

    public void ApplyModeToAll(string mode)
    {
        foreach (var device in _devices)
            device.ApplyMode(mode);
    }

    public void PrintAllStatuses()
    {
        foreach (var device in _devices)
            Console.WriteLine(device.GetStatus());
    }
}
