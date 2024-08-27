from typing import Awaitable

from asgiref.typing import (
    ASGIReceiveCallable,
    ASGISendCallable,
    Scope,
)

from pim.handle_http import handle_http


async def app(
    scope: Scope, receive: ASGIReceiveCallable, send: ASGISendCallable
) -> Awaitable[None]:
    """
    ASGI (Asynchronous Server Gateway Interface) is a specification for Python
    web servers and applications to communicate with each other asynchronously.
    It is designed to handle asynchronous web applications and supports
    long-lived connections like WebSockets.

    How ASGI Works:
    Scope: Contains metadata about the connection (e.g., type of connection,
    HTTP headers).
    Receive: An asynchronous callable that receives messages from the client.
    Send: An asynchronous callable that sends messages to the client.
    ASGI allows for handling multiple types of connections (HTTP, WebSocket)
    in an asynchronous manner, making it suitable for modern web applications
    that require real-time communication.

    futher reading: https://asgi.readthedocs.io/en/latest/index.html
    """
    if scope["type"] == "http":
        await handle_http(scope, receive, send)
        return
