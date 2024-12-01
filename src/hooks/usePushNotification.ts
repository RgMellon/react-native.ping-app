// hooks/usePushNotifications.ts
import { useState, useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { useModalPush } from "../context/modal-push";
import { useAuth } from "../context/auth";
import { addNewNotificationService } from "../services/add.new.push.token.service";

function handleRegistrationError(errorMessage: string) {
  console.error("Error registering for push notifications:", errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  console.log("Registering push notifications");
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

export function usePushNotifications() {
  const { data } = useAuth();

  const { setShow, setModalInfo } = useModalPush();

  const notificationListener = useRef<Notifications.EventSubscription | null>(
    null
  );
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        addNewNotificationService({
          id: data.user.id,
          token: token!,
        }).catch((err) => console.log("err", err));
      })
      .catch((error) => console.log("error on notification", error));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        //TODO pegar aqui os dados enviado pelo service, salvar pra apresentar no modal
        console.log(
          notification.request.content.data,
          " -notification------------"
        );
        setShow(true);
        setModalInfo({
          name: notification.request.content.data.description,
          price: notification.request.content.data.price,
        });
        // setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response, "oi");
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
}
