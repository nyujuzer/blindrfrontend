import os
import re
import json
package_names = set()

def iterate_files(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            yield os.path.join(root, file)

# Usage
for file in iterate_files('.\\'):
    if 'node_modules' not in file.split("\\") and (file.split(".")[-1] == "tsx" or file.split(".")[-1] == "ts"):
        with open(file, 'r') as f:
            for line in f:
                match = re.search(r'from\s+[\'"]([^\'"]+)[\'"]', line)
                if match and (".." not in match.group(1).split("/") and "." not in match.group(1).split("/")):
                    # print(match.group(2))
                    package_names.add(match.group(1))

# Print the unique package names
# for package_name in package_names:
#     print(package_name)

# @expo/vector-icons
# @react-native-async-storage/async-storage
# @react-native-community/slider
# @react-navigation/native
# @react-navigation/stack
# expo-av
# expo-image-picker
# expo-linear-gradient
# expo-location
# expo-notifications
# expo-secure-store
# native-notify
# react
# react-native
# react-native-gesture-handler
# react-native-gifted-chat
# react-native-modern-datepicker
# react-native-paper
# websocket