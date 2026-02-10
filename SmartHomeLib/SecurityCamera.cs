using System;

namespace SmartHomeLib;

public class SecurityCamera : SmartDevice
{
    private bool _isRecording;
    private int _storageUsedMb;

    public int StorageCapacityMB { get; }
    public int StorageUsedMB => _storageUsedMb;
    public bool IsRecording => _isRecording;

    public SecurityCamera(string deviceId, string name, int storageCapacityMb)
        : base(deviceId, name)
    {
        if (storageCapacityMb <= 0)
            throw new ArgumentException("Storage capacity must be greater than 0.", nameof(storageCapacityMb));

        StorageCapacityMB = storageCapacityMb;
        _storageUsedMb = 0;
        _isRecording = false;
    }

    public void StartRecording()
    {
        if (!IsOnline || !IsPoweredOn)
            throw new InvalidOperationException("Camera must be online and powered on to start recording.");

        if (_storageUsedMb >= StorageCapacityMB)
            throw new InvalidOperationException("Cannot start recording: storage is full.");

        _isRecording = true;
    }

    public void StopRecording()
    {
        _isRecording = false;
    }

    public void SimulateRecording(int minutes)
    {
        if (minutes <= 0)
            throw new ArgumentException("Minutes must be greater than 0.", nameof(minutes));

        if (!_isRecording)
            throw new InvalidOperationException("Camera is not recording.");

        int additional = minutes * 5; // simple storage rule

        if (_storageUsedMb + additional > StorageCapacityMB)
            throw new InvalidOperationException("Recording would exceed storage capacity.");

        _storageUsedMb += additional;
    }

    public override void TurnOff()
    {
        _isRecording = false;
        base.TurnOff();
    }

    public override void ApplyMode(string mode)
    {
        if (string.Equals(mode, "Night", StringComparison.OrdinalIgnoreCase))
        {
            StartRecording();
        }
    }

    public override string GetStatus()
    {
        return $"SecurityCamera | Id={DeviceId}, Name={Name}, Online={IsOnline}, PoweredOn={IsPoweredOn}, Recording={_isRecording}, Storage={_storageUsedMb}/{StorageCapacityMB}MB";
    }
}
