import {
  Accuracy,
  hasStartedLocationUpdatesAsync,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from "expo-location";
import * as TaskManager from "expo-task-manager";
import { saveStorageLocation } from "../libs/asyncStorage/locationStorage";

export const BACKGROUND_TASK = "location-tracking";

TaskManager.defineTask(BACKGROUND_TASK, ({ data, error }: any) => {
  try {
    if (error) {
      throw error;
    }

    if (data) {
      const { coords, timestamp } = data.locations[0];

      const currentLocation = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        timestamp,
      };

      saveStorageLocation(currentLocation);
    }
  } catch (error) {
    console.log(error);
    stopLocationTask();
  }
});

export async function startLocationTask() {
  try {
    const taskHasStarted = await hasStartedLocationUpdatesAsync(
      BACKGROUND_TASK
    );

    if (taskHasStarted) {
      await stopLocationTask();
    }

    await startLocationUpdatesAsync(BACKGROUND_TASK, {
      accuracy: Accuracy.Highest,
      distanceInterval: 1,
      timeInterval: 1000,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function stopLocationTask() {
  try {
    await stopLocationUpdatesAsync(BACKGROUND_TASK);
  } catch (error) {
    console.log(error);
  }
}
