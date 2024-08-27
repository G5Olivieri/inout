from typing import Awaitable, Callable, Union
from asgiref.typing import (
    ASGIReceiveCallable,
    HTTPScope,
    HTTPResponseStartEvent,
    HTTPResponseBodyEvent,
    HTTPResponseTrailersEvent,
    HTTPServerPushEvent,
    HTTPDisconnectEvent,
)


async def handle_http(
    scope: HTTPScope,
    receive: ASGIReceiveCallable,  # pylint: disable=unused-argument
    send: Callable[
        [
            Union[
                HTTPResponseStartEvent,
                HTTPResponseBodyEvent,
                HTTPResponseTrailersEvent,
                HTTPServerPushEvent,
                HTTPDisconnectEvent,
            ]
        ],
        Awaitable[None],
    ],
) -> Awaitable[None]:
    if scope["method"] == "GET":
        body = b"Hello World ASGI!"
        await send(
            {
                "type": "http.response.start",
                "status": 200,
                "headers": [
                    (b"content-type", b"text/plain"),
                    (b"content-length", str(len(body)).encode("utf-8")),
                ],
            }
        )
        await send(
            {
                "type": "http.response.body",
                "body": body,
                "more_body": False,
            }
        )
    else:
        await send(
            {
                "type": "http.response.start",
                "status": 405,
            }
        )
        await send(
            {
                "type": "http.response.body",
            }
        )
    return
