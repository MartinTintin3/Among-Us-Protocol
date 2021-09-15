export function lerp(a: number, b: number, t: number): number {
	return a + (b - a) * t;
}

export function alerp(a: number, b: number, v: number): number {
	return (v - a) / (b - a);
}

export function clamp(a: number, b: number, v: number): number {
	return Math.min(Math.max(a, v), b);
}