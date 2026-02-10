using System;

namespace MiniSmartHomeLib
{
    /*
     * PowerModule
     * ----------------
     * This class represents the reusable "power / connection" subsystem.
     * 
     * COMPOSITION (HAS-A):
     * SmartDevice HAS a PowerModule.
     * 
     * No other class is allowed to directly control online or power state.
     * All power rules are enforced here.
     */
    public class PowerModule
    {
        // Indicates whether the device is connected to the network
        public bool IsOnline { get; private set; }

        // Indicates whether the device is currently powered on
        public bool IsPoweredOn { get; private set; }

        /*
         * Sets the online/offline state of the device.
         * If a device goes offline, it is automatically powered off.
         */
        public void SetOnline(bool online)
        {
            IsOnline = online;

            // Safety rule: an offline device cannot stay powered on
            if (!IsOnline && IsPoweredOn)
            {
                IsPoweredOn = false;
            }
        }

        /*
         * Turns the device on.
         * Throws InvalidOperationException if the device is offline.
         */
        public void TurnOn()
        {
            if (!IsOnline)
            {
                throw new InvalidOperationException("Cannot turn on while offline.");
            }

            IsPoweredOn = true;
        }

        /*
         * Turns the device off.
         * Turning off is always allowed.
         */
        public void TurnOff()
        {
            IsPoweredOn = false;
        }
    }
}
