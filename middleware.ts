import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) =>
						request.cookies.set(name, value),
					);
					response = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						response.cookies.set(name, value, options),
					);
				},
			},
		},
	);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const isAuthPage = request.nextUrl.pathname.startsWith("/auth/login") ||
		request.nextUrl.pathname.startsWith("/auth/sign-up");
	const isAdminPage = request.nextUrl.pathname.startsWith("/admin");
	const isDriverPage = request.nextUrl.pathname.startsWith("/driver");
	const isSalesPage = request.nextUrl.pathname.startsWith("/sales");
	const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

	// Si no está autenticado y trata de acceder a páginas protegidas
	if (!user && (isAdminPage || isDriverPage || isSalesPage || isDashboardPage)) {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}

	// Si está autenticado y necesita verificación de rol (rutas protegidas o redirección desde auth)
	if (user && (isAdminPage || isDriverPage || isSalesPage || isAuthPage)) {
		// Buscamos el rol primero en los metadatos del usuario (¡Tiempo de respuesta 0ms extra!)
		let rol = user.user_metadata?.rol;

		// Fallback: Si el usuario aún no tiene el rol en sus metadatos (ej: usuarios muy antiguos), consultamos la BD
		if (!rol) {
			const { data: profile } = await supabase
				.from("profiles")
				.select("rol")
				.eq("id", user.id)
				.single();

			rol = profile?.rol;
		}

		// Protección de rutas por rol
		if (isAdminPage || isDriverPage || isSalesPage) {
			// Vendedor: solo puede acceder a /sales
			if (rol === "vendedor") {
				if (isAdminPage || isDriverPage) {
					return NextResponse.redirect(new URL("/sales", request.url));
				}
			}
			// Chofer: solo puede acceder a /driver
			else if (rol === "chofer") {
				if (isAdminPage || isSalesPage) {
					return NextResponse.redirect(new URL("/driver", request.url));
				}
			}
			// Administrador: solo puede acceder a /admin
			else if (rol === "administrador") {
				if (isDriverPage || isSalesPage) {
					return NextResponse.redirect(new URL("/admin", request.url));
				}
			}
			// Si no tiene un rol válido, redirigir a dashboard
			else {
				return NextResponse.redirect(new URL("/dashboard", request.url));
			}
		}

		// Si está autenticado y trata de acceder a login/signup, redirigir según rol
		if (isAuthPage) {
			if (rol === "administrador") {
				return NextResponse.redirect(new URL("/admin", request.url));
			} else if (rol === "chofer") {
				return NextResponse.redirect(new URL("/driver", request.url));
			} else if (rol === "vendedor") {
				return NextResponse.redirect(new URL("/sales", request.url));
			}
			return NextResponse.redirect(new URL("/dashboard", request.url));
		}
	}

	return response;
}

export const config = {
	matcher: [
		"/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
