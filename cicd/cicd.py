#!/usr/bin/python3

import os
import subprocess


def build_image(path, tag):
    print(f"Building Docker image for [{tag}]...")
    subprocess.run(["docker", "build", "--no-cache", "-t", tag, path], check=True, env={"DOCKER_BUILDKIT": "1"})


def push_image(path, tag):
    print(f"Pushing Docker image [{tag}] to Docker Hub...")
    subprocess.run(["docker", "push", tag], check=True)


def main():
    docker_hub_repo = "tr0yyy/f1-prediction-python"

    paths = ['frontend', 'src/microservices']

    steps = [
        build_image,
        push_image
    ]

    steps_naming = [
        'Build Docker Images',
        'Push Docker Images'
    ]

    for idx, step_function in enumerate(steps):
        print(f"[STEP {idx + 1}/{len(steps)}] {steps_naming[idx]}.")
        for path in paths:
            if path == 'frontend':
                step_function(path, f"{docker_hub_repo}-nginx-frontend:latest")
                continue
            for service in os.listdir(path):
                service_path = os.path.join(path, service)
                if os.path.isdir(service_path):
                    service_name = service
                    service_tag = f"{docker_hub_repo}-{service_name}:latest"
                    step_function(service_path, service_tag)

    print("All images built and pushed successfully.")


main()
